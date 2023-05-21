import React from "react";
import "./LDAStats.css";
import axios from "axios";

export default class LDAStats extends React.Component {
    
    state = {
        options: [3, 4, 5, 6, 7, 8, 9, 10],
        selectedFile: null,
        data: null,
        clusterNum: 3
    };

    // On file select (from the pop up)
    onFileChange = event => {
        event.preventDefault()

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };
    
    onSelectChange = event => {
        this.state.clusterNum = event.target.value
    }

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
            );

        axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post(`http://127.0.0.1:5000/lda/${this.state.clusterNum}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
//        .then(res => res.json())
        .then((data) => {
            this.setState({data: data.data})
            const fragment = document.createRange().createContextualFragment(
                `<div id="inserted">${data.data.data}</div>`)

            let anchor = document.getElementById("anchor")
            anchor.innerHTML = ''
            anchor.appendChild(fragment)
        })
        .catch(error => {
            if (!error.response) {
                // network error
                this.errorStatus = 'Error: Network Error';
            } else {
                this.errorStatus = error.response.data.message;
            }
        })
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>

                    <p>File Type: {this.state.selectedFile.type}</p>

                </div>
                );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
                );
        }
    };

    render() {

        return (
            <div>
                <div className={"clusters_info"}>
                    <h5>
                        Укажите необходимое количество кластеров: 
                    </h5>
                    <select onChange={this.onSelectChange.bind(this)}>
                        {this.state.options.map(option => {
                            return <option value={option} >{option}</option>
                        })}
                    </select>
                </div>
                <div>
                    <input type="file" onChange={this.onFileChange.bind(this)} name="file"/>
                    <button onClick={this.onFileUpload.bind(this)}>
                        Upload!
                    </button>
                </div>
                <div id="anchor" className={"cluster_anchor"}></div>
            </div>
            );
    }

    //    constructor(props) {
    //        super(props);
    //        this.state = {
    //            data: null,
    //            options: [3, 4, 5, 6, 7, 8, 9, 10],
    //            file: null
    //        };
    //    }
    //    
    //    onFileChange = event => {
    //        this.setState({ file: event.target.files[0] });
    //
    //    };
    //    fetchdata(clusterNum) {
    //        let url = `http://127.0.0.1:5000/lda/3`;
    //        let file = this.state.file;
    //
    //        const formData = new FormData();
    //        
    //        formData.append(
    //            "myFile",
    //            this.state.file,
    //            this.state.file.name
    //            );
    //        
    //        axios.post(url, formData)

    //        fetch(url, {
    //            method: 'POST',
    //            mode: 'no-cors',
    //            body: file,
    //            headers: {
    //                'content-type': file.type,
    //                'content-length': `${file.size}`
    //            }
    //        })
    //            .catch(e => console.log(e));
    //    }

    //    componentDidMount() {
    ////        this.fetchdata(null);
    //    }
    //    
    //    render() {
    //        return<div className={"statsPage"}>
    //            <div className={"clusters_info"}>
    //                <h5>
    //                    Укажите необходимое количество кластеров: 
    //                </h5>
    //                <select>
    //                    {this.state.options.map(option => {
    //                        return <option value="option" >{option}</option>
    //                    })}
    //                </select>
    //            </div>
    //            <label>Предоставьте датасет для обработки</label>
    //            <form encType="multipart/form-data" action="">
    //                <input type="file" id="dataset" name="dataset" onChange={this.onFileChange}/>
    //                <button onClick={this.fetchdata.bind(this)}>send</button>
    //            </form>
    //
    //            <div id="anchor" className={"cluster_anchor"}></div>
    //            <button onClick={console.log(this.state)}>setate</button>
    //        </div>
    //    }
}
