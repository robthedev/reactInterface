var React = require('react');

var AddAppt = React.createClass({

    toggleForm: function (){
        this.props.handleToggle();
    },

    handleAdd: function (e){
        var tempItem = {
            petName: this.refs.inputPetName.value,
            petOwner: this.refs.inputOwnerName.value,
            aptDate: this.refs.inputAptDate.value + ' ' + this.refs.inputAptTime.value,
            aptNotes: this.refs.inputAptNotes.value
        }
        e.preventDefault();
        this.props.addApt(tempItem);
    },
    render: function(){

        var displayAptFormBody = {
            display: this.props.bodyVisible ? 'block' : 'none'
        }

        return  (
            <div className="panel panel-primary">
            <div className="panel-heading apt-addheading">
                <span className="glyphicon glyphicon-plus" onClick={this.toggleForm}>Add Appointment</span> 
            </div>
            <div className="panel-body" style={displayAptFormBody}>
              <form className="add-appointment form-horizontal" onSubmit={ this.handleAdd }>
                <div className="form-group">
                  <label className="col-sm-2 control-label" htmlFor="petName">Pet Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control"
                      id="petName" ref="inputPetName" placeholder="Pet's Name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label" htmlFor="petOwner">Pet Owner</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control"
                      id="petOwner" ref="inputOwnerName" placeholder="Owner's Name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label" htmlFor="aptDate">Date</label>
                  <div className="col-sm-4">
                    <input type="date" className="form-control"
                      id="aptDate" ref="inputAptDate" />
                  </div>
                  <label className="col-sm-2 control-label" htmlFor="aptTime">Time</label>
                  <div className="col-sm-4">
                    <input type="time" className="form-control"
                      id="aptTime" ref="inputAptTime" />
                  </div>
          
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label" htmlFor="aptNotes">Apt. Notes</label>
                  <div className="col-sm-10">
                    <textarea className="form-control" rows="4" cols="50"
                      id="aptNotes" ref="inputAptNotes" placeholder="Appointment Notes"></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-primary pull-right">Add Appointment</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
    }
});

module.exports = AddAppt;