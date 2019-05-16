import React, {Component} from 'react';
import {getText} from "../../store/reducers/text";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {Application, Sprite} from 'pixi.js'
import {Link} from "react-router-dom";
import {getMarker, getMarkerCurrentId} from "../../store/reducers/marker";
import {addMarker, updateMarker} from "../../store/actions/marker";


class Preview extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.app = new Application({backgroundColor: 0x1099bb});
        this.refs.map.appendChild(this.app.view);

        this.image = new Sprite.from("/image/map.png");
        this.image.width = 1000;
        this.image.height = 600;
        this.image.anchor.set(0, 0);
        this.app.stage.addChild(this.image);

        this.onResize();
    }

    onResize() {

        const {offsetWidth: w, offsetHeight: h} = this.refs.map;

        this.app.renderer.resize(w, h);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {markers} = this.props;
        console.log(markers.size);
    }

    onClickMarker(e) {
        const {dispatch} = this.props;

        let xPosition = e.clientX;
        let yPosition = e.clientY;

        dispatch(addMarker({id: Date.now(), name: "", x: xPosition, y: yPosition}));
    }

    onFormSubmit(e) {
        const {dispatch, currentId} = this.props;
        e.preventDefault();
        dispatch(updateMarker(currentId, e.currentTarget.elements[0].value));
    }

    render() {
        const {markers, currentId} = this.props;

        let show_marker_data = markers.map(marker =>
            <li className="marker_data" key={marker.id}>
                <span>{marker.id}</span>
                <span>{marker.name}</span>
                <span>{marker.x}</span>
                <span>{marker.y}</span>
                <span>{marker.status}</span>
            </li>);

        let show_marker_point = markers.map(marker =>
            <span style={{position: "absolute", left:marker.x+"px",top:marker.y+"px"}} className="pointer_map">
                <img src="/image/marker.png" />
            </span>);

        return (
            <div className="Preview">

                {currentId !== null &&
                <div className="popup">
                    <div className="content-form">
                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                            <label htmlFor="name">Name :</label>
                            <input className="name" type="text" id="name" name="name"/><br/>
                            <input className="submit-form" type="submit" value="Créer le marker"/>
                        </form>
                    </div>
                </div>
                }

                <div className="edit">
                    <ul>
                        {show_marker_data}
                    </ul>
                </div>
                <div className="map" ref={"map"} onClick={(e) => this.onClickMarker(e)}></div>
                <div className="point">
                    {show_marker_point}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    text: getText(state),
    markers: getMarker(state),
    currentId: getMarkerCurrentId(state),
});

const enhance = compose(connect(mapStateToProps));

export default enhance(Preview);

