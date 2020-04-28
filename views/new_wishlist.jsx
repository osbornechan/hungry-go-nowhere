const React = require("react");

class New_Wishlist extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link rel='stylesheet' href='../new_wishlist_styles.css'/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
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
                <br/>
                <div className='form-container'>
                    <div className='row justify-content-center'>
                        <h3>New Wishlist</h3>
                    </div>
                    <br/>
                    <form method='POST' action='/wishlist'>
                        <div className='row justify-content-center'>
                            <p>Product: <input type='text' name='product_name' placeholder='Enter product name'/></p>
                        </div>
                        <div className='row justify-content-center'>
                            <p>Brand: <input type='text' name='brand' placeholder='Enter brand name'/></p>
                        </div>
                        <div className='row justify-content-center'>
                            <p>Category: <input type='text' name='category' placeholder='Change to dropdown'/></p>
                        </div>
                        <div className='row justify-content-center'>
                            <p>Expiry: <input type='text' name='expiry' placeholder='YYYY-MM-DD'/></p>
                        </div>
                        <div className='row justify-content-center'>
                            <p>Image URL: <input type='text' name='img' placeholder='Enter image URL'/></p>
                        </div>
                        <div className='row justify-content-center'>
                            <p>Quantity: <input type='number' name='qty' placeholder='Enter quantity'/></p>
                        </div>
                        <div className='row justify-content-center'>
                            <input type='submit' className='btn btn-primary' value='Submit'/>
                        </div>
                    </form>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New_Wishlist;