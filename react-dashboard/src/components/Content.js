import React from "react";
import axios from "axios";
import Modal from "./Modal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Content extends React.Component{

    constructor(){
        super();
        this.state = {
            facebookPage_id: '',
            facebookPage_name: '',
            facebookPage_phone: '',
            facebookPage_about: '',
            showModal: false,
            updatingListingIndex: -1,
            listings: [
                {
                    id: 1,
                    icon: "zmdi-google-plus",
                    source: "Google",
                    name: "ABC Dental",
                    address: "2101 California St",
                    phone: "111.111.1111",
                    rating: "3/5",
                    listed: true,
                    status: true
                },
                {
                    id: 2,
                    icon: "zmdi-globe",
                    source: "Yelp",
                    name: "ABC Dental",
                    address: "2101 California St",
                    phone: "111.111.1111",
                    rating: "2/5",
                    listed: false,
                    status: false
                },
                {
                    id: 3,
                    icon: "zmdi-yahoo",
                    source: "Yahoo!",
                    name: "ABC Dental",
                    address: "2101 California St",
                    phone: "111.111.1111",
                    rating: "3/5",
                    listed: false,
                    status: false
                },
            ]
        }

        this.commonChange = this.commonChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    showModal = () => {
        this.setState({ showModal: true });
    };
    
    hideModal = () => {
        this.setState({ showModal: false });
    };

    commonChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    saveChanges(event){

        toast.info("Saving changes...");

        const page = this.state.listings[this.state.updatingListingIndex];

        axios.post(`https://graph.facebook.com/${page.id}`,null, { params: {
            phone: this.state.facebookPage_phone,
            about: this.state.facebookPage_about,
            access_token: page.access_token
          }}).then(res => {
            toast.success('Changes saved successfully!');
            this.hideModal();  
        })
          .catch(err => {
            toast.error('Some error occured!');
            console.log(err);
          })

             page.phone = this.state.facebookPage_phone;
             page.about = this.state.facebookPage_about;
            
             this.state.facebookPage_about = "";
             this.state.facebookPage_phone = ""; 
             this.forceUpdate();  
    }

    getCookieValue(a) {
        var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }
    
    getLongLivedUserToken(){
        var requestURL = `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.REACT_APP_SOCIAL_AUTH_FACEBOOK_KEY}&client_secret=${process.env.REACT_APP_SOCIAL_AUTH_FACEBOOK_SECRET}&fb_exchange_token=${this.getCookieValue('access_token')}`;       
        axios.get(requestURL).then(response => console.log(response.data));
    }

    getUserManagedPages(){

        toast('Loading Facebook pages');

        var user_access_token = this.getCookieValue('access_token'), uid = this.getCookieValue('uid') ;
        axios.get(`https://graph.facebook.com/${uid}/accounts?access_token=${user_access_token}`)
        .then(response => {

            var pages = [...response.data.data]

            pages.forEach(page => {

                axios.get(`https://graph.facebook.com/${page.id}?fields=name,about,emails,website,single_line_address,is_published,phone&access_token=${page.access_token}`)
                .then(response => {

                    var temp = {
                        id: page.id,
                        access_token: page.access_token,
                        icon: "zmdi-facebook",
                        source: "Facebook",
                        name: page.name,
                        about: response.data.about,
                        address: response.data.single_line_address || "",
                        phone: response.data.phone || "",
                        rating: "",
                        listed: response.data.is_published,
                        status: true
                    }

                    this.setState(prevState => ({
                        listings: [...prevState.listings, temp]
                      }))

                })
                .catch(err => console.log(err))
                
            })
            
        })
        .catch(err => {
            alert("Some error occured in initial page listing. Check console for more details")
            console.log("Error from getUserManagedPages() \n", err);
        })

    }

    updatePageMetaData(pageId){
        //show a popup with all the editable field..close the popup when the save changes button is pressed

        for(var i=0;i<this.state.listings.length;++i)
            if(pageId == this.state.listings[i].id){
                this.setState({'updatingListingIndex': i}, () => {
                    console.log(this.state.updatingListingIndex, 'updatinglistinginexfromstate');
                    this.setState({
                        facebookPage_id: (this.state.listings[i].id || ''),
                        facebookPage_about : (this.state.listings[i].about || ''),
                        facebookPage_name : (this.state.listings[i].name || ''),
                        facebookPage_phone : (this.state.listings[i].phone || ''),
                    })
                  }); 
                break;
            }
        this.showModal();
    }

    componentDidMount(){
        this.getUserManagedPages();
    }


    render(){
        return(
            
            <div className="container-fluid">
            <div className="listings table-responsive">
              <div className="text-center" style={{background: "#EEF5F4",padding: "1px 0px"}}>
                <h3>Listings</h3>
              </div>
              <Modal show={this.state.showModal} handleSave={this.saveChanges} handleClose={this.hideModal}>
                <h2>Update Page Details of {this.state.facebookPage_name}</h2>
                <p>All values will be overwritten</p>
                <label htmlFor="About">Description: </label>
                <textarea rows="4" name="facebookPage_about" id="About" value={this.state.facebookPage_about} onChange={this.commonChange}></textarea><br></br>
                <label htmlFor="phone">Phone: </label>
                <input type="text" name="facebookPage_phone" id="phone" value={this.state.facebookPage_phone} onChange={this.commonChange}></input><br></br>
                
                </Modal>
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Source</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Rating</th>
                    <th>Listed</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                {
                    this.state.listings.map(listing => (
                        <tr key={listing.id}>
                            <td><i className={"zmdi " + listing.icon}></i></td>
                            <td>{listing.source}</td>
                            {!listing.status && Math.random() >= 0.5 ? <td className="red">{listing.name}</td>: <td>{listing.name}</td>}
                            {!listing.status && Math.random() >= 0.5 ? <td className="red">{listing.address || '-'}</td>: <td>{listing.address || '-'}</td>}
                            {!listing.status && Math.random() >= 0.5 ? <td className="red">{listing.phone || '-'}</td>: <td>{listing.phone || '-'}</td>}
                            {!listing.status && Math.random() >= 0.5 ? <td className="red">{listing.rating || '-'}</td>: <td>{listing.rating || '-'}</td>}   
                            <td>{listing.listed ? "Yes" : "No"}</td>
                            <td>{listing.status ? "✔️" : "❌" }</td>
                            <td>{listing.source === "Facebook" ? <button className="listing-update" onClick={e => this.updatePageMetaData(listing.id)}>Update</button> : ""}</td>

                        </tr>
                    ))
                }
                </tbody>
              </table>
            </div>
            <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          </div>
        )
    }
};

export default Content;