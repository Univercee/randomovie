import React from "react";
import Emitter from "../utils/EventEmitter";

export default class Card extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            default_image: '/images/noimage.png',
            image: '',
            title: '',
            state_name: '',
        }
    }
    componentDidMount(){
        Emitter.on('get_movie_success', (data)=>{
            this.setState({image: data.image, title: data.title})
            this.setState({state_name: 'loaded'})
        })
        Emitter.on('get_movie_start', ()=>{
            this.setState({state_name: 'loading', title: ''})
        })
    }
    render(){
        let is_skeleton = this.state.state_name=='img_loaded'? '' : 'skeleton'
        let imgSrc = this.state.image ? this.state.image : this.state.default_image
        let title = this.state.state_name=='img_loaded' ? this.state.title : ''
        let licenseVisibility = imgSrc==this.state.default_image ? 'visible' : 'hidden'
        let imageVisibility = this.state.state_name=='img_loaded' ? 'visible' : 'hidden'
        return (
            <div className="card">
                <div className={`card__image ${is_skeleton}`}>
                    <img src={this.state.image} style={{visibility: imageVisibility}} onError={()=>{this.setState({image: this.state.default_image})}} onLoad={()=>{ this.setState({state_name: 'img_loaded'}) }}/>
                    <a style={{visibility: licenseVisibility&&imageVisibility}} className="img-license" href="https://www.flaticon.com/free-icons/no-camera" title="no camera icons">No camera icons created by Those Icons - Flaticon</a>
                </div>
                <div className="card__body">
                    <div className={`card__title ${is_skeleton}`}>
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        )
    }
}