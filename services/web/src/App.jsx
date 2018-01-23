import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './App.css';

import CensusList from './components/CensusList';
import FlashMessages from './components/FlashMessages';
import NotFound from './components/NotFound'

const fieldNames = [ 
                     { idx: 0, name: 'class of worker' },
                     { idx: 1, name: 'industry code' },
                     { idx: 2, name: 'occupation code' },
                     { idx: 3, name: 'education' },
                     { idx: 4, name: 'wage per hour' },
                     { idx: 5, name: 'last education' },
                     { idx: 6, name: 'marital status' },
                     { idx: 7, name: 'major industry code' },
                     { idx: 8, name: 'major occupation code' },
                     { idx: 9, name: 'mace' },
                     { idx: 10, name: 'hispanice' },
                     { idx: 11, name: 'sex' },
                     { idx: 12, name: 'member of labor' },
                     { idx: 13, name: 'reason for unemployment' },
                     { idx: 14, name: 'fulltime' },
                     { idx: 15, name: 'capital gain' },
                     { idx: 16, name: 'capital loss' },
                     { idx: 17, name: 'dividends' },
                     { idx: 18, name: 'income tax liability' },
                     { idx: 19, name: 'previous residence region' },
                     { idx: 20, name: 'previous residence state' },
                     { idx: 21, name: 'household-with-family' },
                     { idx: 22, name: 'household-simple' },
                     { idx: 23, name: 'weight' },
                     { idx: 24, name: 'msa-change' },
                     { idx: 25, name: 'reg-change' },
                     { idx: 26, name: 'within-reg-change' },
                     { idx: 27, name: 'lived-here' },
                     { idx: 28, name: 'migration prev res in sunbelt' },
                     { idx: 29, name: 'num persons worked for employer' },
                     { idx: 30, name: 'family members under 118' },
                     { idx: 31, name: 'father birth country' },
                     { idx: 32, name: 'mother birth country' },
                     { idx: 33, name: 'birth country' },
                     { idx: 34, name: 'citizenship' },
                     { idx: 35, name: 'own business or self employed' },
                     { idx: 36, name: 'fill questionnaire for veteran\'s admin' },
                     { idx: 37, name: 'veterans benefits' },
                     { idx: 38, name: 'weeks worked in year' },
                     { idx: 38, name: 'year' },
                     { idx: 40, name: 'salary range' },
                  ]; 
                  
class App extends Component {
  
  constructor (props) {
    super(props)
 
    this.state = {
      selectedOption: null,
      flashMessages: [],
      census: {
        items: [],
        name: '',
      },
      cancelSource: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.getCensus = this.getCensus.bind(this)
    this.deleteFlashMessage = this.deleteFlashMessage.bind(this)
    this.createFlashMessage = this.createFlashMessage.bind(this)
  }
  
  handleChange(selectedOption){
    this.setState({ selectedOption: selectedOption });
    this.getCensus(selectedOption.value)
  }
  
  getCensus(id) {
    if (this.state.cancelSource !== null) { this.state.cancelSource.cancel(); }
    var CancelToken = axios.CancelToken;
    var source = CancelToken.source();
    this.setState( { cancelSource: source } )
    const options = {
      url: 'http://localhost:3000/census/by/' + id,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      cancelToken: source.token
    };
    return axios(options)
    .then((res) => {
      if (res.data.status === 'success'){
        this.setState({ census: res.data.data });
      } else {
        this.createFlashMessage('Unable to load data. Please retry', 'error');
      }
    })
    .catch((err) => { 
      if (axios.isCancel(err)) {
         console.log('Request canceled');
       }else{
        console.log(err); 
        this.createFlashMessage('Unable to load data. Please retry', 'error');
      }
    })
  }

  deleteFlashMessage (index) {
    if (index > 0) {
      this.setState({
        flashMessages: [
          ...this.state.flashMessages.slice(0, index),
          ...this.state.flashMessages.slice(index + 1)
        ]
      })
    } else {
      this.setState({
        flashMessages: [...this.state.flashMessages.slice(index + 1)]
      })
    }
  }
  
  createFlashMessage (text, type = 'success') {
    const message = { text, type }
    this.setState({
      flashMessages: [...this.state.flashMessages, message]
    })
  }
    
  render(){
  	const { selectedOption , flashMessages} = this.state;
  	const value = selectedOption && selectedOption.value;
    const valueLabel = selectedOption  ? selectedOption.label : "value"    
    return (
      <div>
        <FlashMessages
          deleteFlashMessage={this.deleteFlashMessage}
          messages={flashMessages} />
        <Switch>
          <Route exact path='/' render={() => (
            <div>
              <form className="form">
                <div className="container-fluid">
                  <Select
                    className=""
                    value={value}
                    onChange={this.handleChange}
                    options={
                      fieldNames.map( x => { return { value: x.idx, label: x.name } })
                    }
                  />
                </div>
              </form>
              <CensusList key={this.state.census.name} field={valueLabel} census={this.state.census.items} />                              
            </div>
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App
