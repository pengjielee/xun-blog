---
title: "React高阶组件"
url: "post/the-react-higher-order-component"
thumbnail: "https://i.loli.net/2021/03/01/cozq9wCtlRYLUb2.jpg"
date: 2020-11-11T10:34:27+08:00
keywords: '高级组件,React'
description: ''
tags: ['React']
categories: []
draft: false
---

高阶组件（HOC），High Order Component。

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

高阶组件是参数为组件，返回值为新组件的函数。

```javascript
class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list">
        {
          this.props.list.map(function(item, index) {
            return (
              <div className="list-item">
                <a className="title">{item.title}</a>
                <div className="content" dangerouslySetInnerHTML={{__html: item.content}}></div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(id,e){
    this.props.handleRemove(id,e);
  }

  renderList(){
    const self = this;
    return this.props.list.map(function(item,index){
      return (
        <div className="list-item" key={item.id}>
          <div className="date">{item.create_date}</div>
          <div className="action">
            <a onClick={(e) => self.handleRemove(item.id,e) }>delete</a>
          </div>
        </div>
      );
    })
  }

  render() {
    return (
      <div className="list">
        { this.renderList() }
      </div>
    );
  }
}

const withList = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        list: props.list || [],
        page: 1
      };
    }

    componentDidMount() {
      this.getList(this.page);
    },

    getList(page) {
      fetch('//xxx.com',{ page: page})
        .then(res => res.json())
        .then(data => {
          const newList = this.state.list.concat(data);
          this.setState({ list: newList })
        })
    }

    handleRemove = async (id, e) => {
      console.log('remove');
    };

    render() {
      return (
        <div className="page">
          <WrappedComponent
            list={this.state.list}
            handleRemove={this.handleRemove}
          />
        </div>
      );
    }
  };
};

const withBlogList = withList(BlogList);
const withNoteList = withList(NoteList);
```

## More

higher-order-components  
https://react.docschina.org/docs/higher-order-components.html