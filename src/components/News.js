import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';


export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8, 
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9411fae5b48143d28a1df1491db5b98b&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let rawData=await data.json();
    this.setState({articles:rawData.articles,
      totalResults: rawData.totalResults,
      loading:false
    })
  }

  handleNext=async ()=> {
    console.log("Next"); 
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9411fae5b48143d28a1df1491db5b98b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data= await fetch(url);
      let rawData=await data.json();
      this.setState({
        page:this.state.page+1,
        articles:rawData.articles,
        loading:false
      })
    }  
  }
  handlePrevious=async ()=>{
    
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=business&apiKey=9411fae5b48143d28a1df1491db5b98b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let rawData=await data.json();
    this.setState({
      page:this.state.page-1,
      articles:rawData.articles,
      loading:false
    })
  }

  render() {
    return (
      <div>
        <div className="container my-3 text-center">
          <h1 className="my-5">News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinner/>}
          <div className="row my-5">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title?element.title.slice(0,45):""}
                    description={element.description?element.description.slice(0,88):""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
          <button type="button" disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))} className="btn btn-dark" onClick={this.handleNext}>Next&rarr;</button>
        </div>
      </div>
    );
  }
}
