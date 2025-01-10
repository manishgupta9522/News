import React, { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let { title, description,imageUrl,newsUrl,author,date,source} = this.props;
    var datechange=new Date(date).toString(); //to get timestring from date
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '85%', zIndex: '1',fontSize:'13px'}}> {source}
                        </span>
          <img
            src={imageUrl?imageUrl:"https://image.cnbcfm.com/api/v1/image/107231161-1682492891014-gettyimages-184045673-bf51af8b-9c14-49f8-b86a-551957f8dadd.jpeg?v=1682899201&w=1920&h=1080"}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="norefrrer" href={newsUrl} target="blank" className="btn btn-sm btn-primary">
              Read more
            </a>
            <p className="card-text"><small className="text-danger">By {!author?"Unknown": author} on {datechange} </small></p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
