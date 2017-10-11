var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AddAppt =  require('./AddAppt')
var AptList = require('./AptList');
var SearchAppts = require('./SearchAppts');

var MainInterface =  React.createClass({
    getInitialState: function () {
        return {
            aptBodyVisible: false,
            orderBy: 'petName',
            orderDir: 'asc',
            queryText: '',
            MyAppts: []
        };
    },
    componentDidMount: function () {
        this.serverRequest = $.get('./js/data.json', function (result){
            var tempApts = result;
            this.setState({
                MyAppts: tempApts
            })
        }.bind(this))
    },
    componentWillUnmount: function (){
        this.serverRequest.abort();
    },

    deleteMessage: function (item){
        var allApts = this.state.MyAppts;
        var newApts = _.without(allApts, item);

        this.setState({
            MyAppts: newApts
        });
    },

    toggleAddDisplay: function (){
        var tempVisibility = !this.state.aptBodyVisible;
     
        this.setState({
            aptBodyVisible: tempVisibility
        });
    },

    addItem: function (tempItem){
        var tempApts = this.state.MyAppts;
        tempApts.push(tempItem);

        this.setState({
            MyAppts: tempApts
        });  
        this.toggleAddDisplay();     
    },

    reOrder: function (orderBy, orderDir){
        this.setState({
            orderBy: orderBy,
            orderDir: orderDir
        });
    },

    reSort: function (orderDir, orderBy){
        this.setState({
            orderBy: orderBy,
            orderDir: orderDir
        });
    },

    searchApts: function (query) {
        this.setState({
            queryText: query
        });
    },

    render: function(){
        console.log(filteredApts);
        var filteredApts = [];
        var orderBy = this.state.orderBy;
        var orderDir = this.state.orderDir;
        var queryText = this.state.queryText;
        var myAppointments = this.state.MyAppts;

        myAppointments.forEach(function(item) {
            if(
                (item.petName.toLowerCase().indexOf(queryText)!= -1) ||
                (item.ownerName.toLowerCase().indexOf(queryText)!= -1) ||
                (item.aptDate.toLowerCase().indexOf(queryText)!= -1) ||
                (item.aptNotes.toLowerCase().indexOf(queryText)!= -1)
            ) {
                filteredApts.push(item);
            }
        });

        filteredApts = _.orderBy(filteredApts, function (item){
            return item[orderBy].toLowerCase();
        }, orderDir);

        filteredApts = filteredApts.map(function (item, index){
            return (
                <AptList key = { index }
                         singleItem = { item } 
                         whichItem = { item }
                         onDelete = { this.deleteMessage }/>
            )
        }.bind(this));
        return (
            <div className="interface">
                <AddAppt 
                    bodyVisible = { this.state.aptBodyVisible }
                    handleToggle = { this.toggleAddDisplay }
                    addApt = { this.addItem }
                />
               <div className="item-list media-list">
                <SearchAppts 
                   orderBy = { this.state.orderBy }
                   orderDir = { this.state.orderDir }
                   onReOrder = { this.reOrder } 
                   onReSort = { this.reSort }
                   onSearch = { this.searchApts }
                />
                   <ul className="item-list media-list">
                       {filteredApts}
                   </ul>
               </div>
            </div>
        )
    }
});

ReactDOM.render(
    <MainInterface />,
    document.getElementById('appointments')
);