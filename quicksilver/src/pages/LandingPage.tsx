import { Link } from "react-router-dom";
import './LandingPage.css';
import Logo from '../assets/quicksilver-logo.png';
import React from 'react'

export default function LandingPage() {
    return    (
        <div className="landing-page">
            <div className="w-80 d-flex align-items-center justify-content-center flex-column">
                <div className="landing-page-content text-center">
             <img alt="Quicksilver Logo" className="logo" src={Logo}/>
             <h2 className="my-3"> QUICKSILVER</h2>
             <p className="mb-5">THE COSMOS LIQUID STAKING ZONE</p> 
        {/* <Link className="px-5 py-3  mt-5" to="/stake">Get Started</Link>  */}
        <NameForm action="bob" />
        </div>
        <div className="social-media-icons mt-5">
        <a href="https://t.me/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Telegram">
									<span className="icon-telegram mx-2"></span>
								</a>
								<a href="https://twitter.com/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Twitter">
									<span className="icon-twitter mx-2"></span>
								</a>
								<a href="https://discord.com/invite/xrSmYMDVrQ" target="_blank" rel="nofollow noreferrer" title="Discord">
									<span className="icon-discord mx-2"></span>
								</a>
								<a href="https://medium.com/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Medium">
									<span className="icon-medium mx-2"></span>
								</a>
        </div>
        </div>
  
        </div>
    
    )
}

const MyQuery = `
      query MyQuery($address: String!) {
    incentives(where: {address: {_eq: $address}}) {
      kyc
      ok
      points
      task1
      task10
      task11
      task12
      task13
      task14
      task15
      task16
      task2
      task3
      task4
      task5
      task6
      task7
      task8
      task9
      utokens
    }
  }
`;

const fetchAllocations = async (networkAddress: string): Promise<any> => {
    console.log('Network Address', networkAddress)
   const result = await fetch(
       `http://data.killerqueen-1.quicksilver.zone:8081/v1/graphql`,
       {
         method: "POST",
         body: JSON.stringify({
           query: MyQuery,
           variables: { address: networkAddress },
         })
       }
     );

     return await result.json();


}

 
  
  

export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
  }

  interface IFormProps {
    /* The http path that the form will be posted to */
    action: string;
  }

  export interface IFormState {
    /* The field values */
    values: IValues;
  
    tokens: Number;
    /* Whether the form has been successfully submitted */
    submitSuccess?: boolean;
  }


class NameForm extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
      super(props);
      const values: IValues = {address: ""};
      const tokens: Number = 0;
      this.state = {
        values,
        tokens,
      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    private handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> => {
        e.preventDefault();
        fetchAllocations(this.state.values.address)
        .then(({ data, errors }) => {
          if (errors) {
            console.error(errors);
          }
          if (data.incentives.length == 0) {
            this.setState({tokens: 0})
          } else {
            console.log(data.incentives)
            this.setState({tokens: data.incentives[0].utokens})
          }
          
        })
        .catch(error => {
          console.error(error);
        });
          const submitSuccess: boolean = await this.submitForm();
          this.setState({ submitSuccess });
      };

      private async submitForm(): Promise<boolean> {
       
        return true;
      }
  
      public render() {
        const { submitSuccess } = this.state;
        return (
          
                <form onSubmit={this.handleSubmit} noValidate={true}>
              <div className="form-group">

              <input type="text" className="form-control mb-1" placeholder="quick1xxxxxxx" value={this.state.values.address} onChange={
            (e: React.FormEvent<HTMLInputElement>) => {
                const { name, value } = e.currentTarget;
                this.setState({values: {address: value}})
            }
          }
          onBlur={
            (e: React.FormEvent<HTMLInputElement>) => {
                const { name, value } = e.currentTarget;
                this.setState({values: {address: value}})
            }
          } />
                <button
                  type="submit"
                  className="btn btn-secondary submit-query-button"
                  style={{ color: 'danger', margin: '10px auto'}}
                >
                  Lookup Allocations
                </button>
              </div>

              {this.state.tokens > 0 && (
                <div className="alert" role="alert" style={{ color: 'danger', margin: '10px auto', padding: '10px auto', letterSpacing: '0.1em'}}>
                You have earned { Number(this.state.tokens)/1e6 } QCK tokens! 
              </div>
              )}
              <div style={{ color: 'danger', margin: '0px auto', padding: '0px auto', letterSpacing: '0.1em', fontSize: '0.8em'}}>{'Please Note: allocations listed here are indicative and subject to change.'}</div>
              <div style={{ color: 'danger', margin: '0px auto', padding: '0px auto', letterSpacing: '0.1em', fontSize: '0.8em'}}>{'Evidence of misbehaviour, abuse or misconduct that comes to light prior mainnet genesis may be taken'}</div>
              <div style={{ color: 'danger', margin: '0px auto', padding: '0px auto', letterSpacing: '0.1em', fontSize: '0.8em'}}>{' into account, and may cause allocations at genesis to differ from those listed here.'}</div>
          </form>
    
        );
      }
  }