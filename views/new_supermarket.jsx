const React = require("react");

class New_Wishlist_Product extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel='stylesheet' href='/new_supermarket_styles.css'/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-9'>
                        <div className='nav-bar-row row justify-content-center'>
                            <div className='nav-bar-col inventory-tab col-4 nav-bar d-flex justify-content-center'>
                                <h3><a href='/inventory/' className='text-white text-decoration-none'>Inventory</a></h3>
                            </div>
                            <div className='nav-bar-col delivery-tab col-4 d-flex justify-content-center'>
                                <h3><a href='/delivery/' className='text-white text-decoration-none'>Delivery</a></h3>
                            </div>
                            <div className='nav-bar-col wishlist-tab col-4 d-flex justify-content-center'>
                                <h3><a href='/wishlist/' className='text-white text-decoration-none'>Wishlist</a></h3>
                            </div>
                        </div>
                        <div className='form-container'>
                            <div className='form-bowl'>
                                <div className='row justify-content-center'>
                                    <h3>New Supermarket</h3>
                                </div>
                                <br/>
                                <form method='POST' action='/delivery/supermarket'>
                                    <div className='row justify-content-center'>
                                        <p>Name: <input type='text' name='supermarket_name' placeholder='Enter name'/></p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Logo: <input type='text' name='logo' placeholder='Enter logo URL'/></p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Website: <input type='text' name='website' placeholder='Enter image URL'/></p>
                                    </div>
                                    <br/>
                                    <div className='row justify-content-center'>
                                        <div className='col-6 d-flex justify-content-end'>
                                            <input type='submit' className='btn btn-primary' value='Submit'/>
                                        </div>
                                        <div  className='col-6'>
                                            <button className='btn back-btn'><a href='/delivery/' className='text-white text-decoration-none'>Back</a></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-3 bowl-base'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </body>
      </html>
    );
  }
}

module.exports = New_Wishlist_Product;