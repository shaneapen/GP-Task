import React from "react";
import axios from "axios";
import Modal from "./Modal";

class Content extends React.Component{

    constructor(){
        super();
        this.state = {
            facebookPage_name: '',
            facebookPage_address: '',
            facebookPage_phone: '',
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
        const page = this.state.listings[this.state.updatingListingIndex];

        axios.post(`https://graph.facebook.com/${page.id}`,null, { params: {
            phone: this.state.facebookPage_phone,
            single_line_address: this.state.facebookPage_address,
            access_token: page.access_token
          }}).then(res => {
            console.log("Sucessful",res)
            alert("Changes have been saved successfully!")
            this.hideModal();  
        })
          .catch(err => (alert("Some error occured"),console.log("Some error occured",err)))

             page.phone = this.state.facebookPage_phone;
             page.address = this.state.facebookPage_address;

             this.state.facebookPage_address = "";
             this.state.facebookPage_phone = "";   
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
                        address: response.data.single_line_address || "-",
                        phone: response.data.phone || "-",
                        rating: "-",
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
        console.log("Update Page called on ",pageId);
        for(var i=0;i<this.state.listings.length;++i)
            if(pageId == this.state.listings[i].id){
                this.setState({'updatingListingIndex': i}, () => {
                    console.log(this.state.updatingListingIndex, 'updatinglistinginexfromstate');
                    console.log("##",this.state.listings[this.state.updatingListingIndex])
                  }); 
                break;
            }
        this.showModal();
    }

    defaultModalValues(){
        var b = (this.state.updatingListingIndex) > -1;
        var i = this.state.updatingListingIndex;
        var obj = {
            'name': b ? this.state.listings[i].name : "",
            'address': b? this.state.listings[i].address : "",
            'phone':b? this.state.listings[i].phone : ""
        }
       return obj;
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
                <h2>Update Page Details</h2>
                <p>All values will be overwritten</p>
                {/* <label htmlFor="Name">Facebook Page Name: </label>
                <input type="text" name="facebookPage_name" id="Name" placeholder={this.defaultModalValues().name} onChange={this.commonChange}></input><br></br> */}
                <label htmlFor="address">Address: </label>
                <input type="text" name="facebookPage_address" id="address" placeholder={this.defaultModalValues().address} onChange={this.commonChange}></input><br></br>
                <label htmlFor="phone">Facebook Page Phone: </label>
                <input type="text" name="facebookPage_phone" id="phone" placeholder={this.defaultModalValues().phone} onChange={this.commonChange}></input><br></br>
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
                            {!listing.status && Math.random() >= 0.5 ? <td className="red">{listing.address}</td>: <td>{listing.address}</td>}
                            {!listing.status && Math.random() >= 0.5 ? <td className="red">{listing.phone}</td>: <td>{listing.phone}</td>}
                            {!listing.status && Math.random() >= 0.5 ? <td className="red">{listing.rating}</td>: <td>{listing.rating}</td>}   
                            <td>{listing.listed ? "Yes" : "No"}</td>
                            <td>{listing.status ? "✔️" : "❌" }</td>
                            <td>{listing.source === "Facebook" ? <button className="listing-update" onClick={e => this.updatePageMetaData(listing.id)}>Update</button> : ""}</td>

                        </tr>
                    ))
                }
                </tbody>
              </table>
            </div>
    
          </div>
        )
    }
};

export default Content;