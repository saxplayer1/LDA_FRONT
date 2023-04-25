import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import "./LDAStats.css";
import ReactHtmlParser from 'react-html-parser';


export default class LDAStats extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            options: [3, 4, 5, 6, 7, 8, 9, 10]
        };
    }
    
    fetchdata(clusterNum) {
        let url = `http://127.0.0.1:5000/lda/${clusterNum ? clusterNum : 3}`;
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                this.setState({data: data.data})
                const fragment = document.createRange().createContextualFragment(
                    `<div id="inserted">${data.data}</div>`
                    )
                let anchor = document.getElementById("anchor")
                anchor.innerHTML = ''
                anchor.appendChild(fragment)
            })
            .catch(e => console.log(e));
    }
    
    componentDidMount() {
        this.fetchdata(null);
    }
    
    render() {
        return<div className={"statsPage"}>
            <div className={"clusters_info"}>
                <h5>
                    Укажите необходимое количество кластеров: 
                </h5>
                <select>
                    {this.state.options.map(option => {
                        return <option value="option" >{option}</option>
                    })}
                </select>
            </div>

            <div id="anchor" className={"cluster_anchor"}></div>
        </div>
    }
}