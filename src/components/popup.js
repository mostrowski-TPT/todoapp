import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';

export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todoname: "",
            date: null,
           };
           this.handleChange = this.handleChange.bind(this);
           this.handleDate = this.handleDate.bind(this);
           this.handleTime = this.handleTime.bind(this);
           this.handleDateChange = this.handleDateChange.bind(this);
    }
  
handleChange(e){
    let name = e.target.value;
    
    this.setState({
        todoname: name
    });
    console.log("handlechane", name)
}

handleTime(event){
  let time = event.target.value;
  this.setState({time: time});
  console.log("TIME IS ", time);
}

handleDate(event){
  let date = event.target.value;
  this.setState({date: date});
  console.log("TIME IS ", date);
}

handleDateChange = date => {
  this.setState({date: date});
  console.log("date changed", date)
};

reset(){
    this.setState({
        todoname: "",
        date: null
    }); 
}

handleSubmit(event){
  let momentTime = moment(this.state.time);
    let momentDate = moment(this.state.date);
    let renderedDateTime = moment({
      year: momentDate.year(),
      month: momentDate.month(),
      day: momentDate.date(),
      hour: momentTime.hours(),
      minute: momentTime.minutes()
});
const newChore = {
  date_time: renderedDateTime,
}
//this.props.actions.addEvent(newChore)
console.log(newChore);
this.setState({date: null, time: null});
}

  render() {
    
      let name = this.state.todoname==="";
      let handleClose = this.props.handleClose;
      let addToDo = this.props.addToDo;
        
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={(e)=>{handleClose(e)}}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Plese enter the task name below
            </DialogContentText>
            <TextField onChange={this.handleChange}
              autoFocus
              margin="dense"
              id="todoname"
              label="todoname"
              type="text"
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker onChange={this.handleDateChange} value ={this.state.date} />
          <TimePicker onChange={this.handleDateChange} value={this.state.time} />
          </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e)=>{handleClose(e)}} color="primary">
              Cancel
            </Button>
            <Button disabled={name} onClick={(e)=>{addToDo(this.state.todoname, this.state.date); this.reset(); handleClose(e)}} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
