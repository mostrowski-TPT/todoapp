import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid } from '@material-ui/core';
import moment from 'moment';
import countdown from 'countdown';





class Todo extends React.Component {
constructor(props){
super(props);
this.updatedate = this.updatedate.bind(this);
this.state = {
  timeleft: null,
  interval: null
}
}

updatedate(){
  let date = this.props.date;
  
 let milisecnds = moment().diff(date, 'miliseconds');
 let left = moment.duration(milisecnds); 
 let seconds = Math.abs(left._data.seconds);
 let minutes = Math.abs(left._data.minutes);
 let hours = Math.abs(left._data.hours);
 let days = Math.abs(left._data.days);
 let timeleft = days + " days, " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";

 
  this.setState({
timeleft: timeleft
  });
}

componentDidMount(){
  this.intervalID = setInterval(()=>this.updatedate(), 1000);
}

componentWillUnmount(){
  clearInterval(this.intervalID);
}

render(){

  return(
    <Paper style={paperstyle}><Typography>{this.props.name}<br></br><hr></hr>Deadline: {moment(this.props.date).format('MMMM Do YYYY, h:mm:ss a')}<br></br><hr></hr>Time left: {this.state.timeleft}</Typography></Paper>
  )
}
}









const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  paperstyle: {
    margin: 5,
    padding: 10,
    minWidth: 250
},
});

const paperstyle = {
    margin: 5,
    padding: 10,
    minWidth: 275
}

class Todos extends React.Component {
constructor(props){
    super(props);
}

  render(){
const {classes} = this.props;
let todos = this.props.todos;
console.log("date in todos", this.props.todos)
console.log(todos);
        let todoslist = todos.map((todo, index)=> <Grid item key={todo.name+index}><Todo name={todo.name} date={todo.date}/></Grid>);
    return (   
        <div>
            <Grid container  direction="row">
        {todoslist}
        </Grid>
        </div>
      );
  }
}

Todos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Todos);