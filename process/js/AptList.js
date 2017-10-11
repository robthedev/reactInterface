var React = require('react');

var AptList = React.createClass({

    handleDelete: function (){
        this.props.onDelete(this.props.whichItem)
    },

    render: function (){
        return (
            <li className="pet-item media">
                <div className="pet-info media-body">
                    <div className="pet-head">
                    <button className="pet-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                        <span className="pet-name">{this.props.singleItem.petName}</span><br/>
                        <span className="apt-date">{this.props.singleItem.aptDate}</span>
                    </div>
                    <div className="owner-name">
                        <span className="label-owner">owner: {this.props.singleItem.ownerName}</span>
                    </div>
                    <div className="apt-notes">{this.props.singleItem.aptNotes}</div>
                </div>
            </li>
        )
    }
});

module.exports = AptList;