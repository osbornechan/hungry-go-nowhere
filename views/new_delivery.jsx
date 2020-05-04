const React = require("react");

class New_Delivery extends React.Component {
  render() {

    let allSupermarketsList = this.props.allSupermarkets.map(supermarket => {
        return (<option>{supermarket.supermarket_name}</option>);
    })

    let allCategoriesList = this.props.allCategories.map(category => {
        return (<option>{category.category_name}</option>);
    })

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel='stylesheet' href='/new_delivery_styles.css'/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='nav-bar col-2'>
                        <div className='nav-bar-row row justify-content-center'>
                            <a href='/inventory/'><img src='/logo-reverse.png' className='logo'/></a>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5>Welcome, {this.props.userName}!</h5>
                            <button className='btn' style={{width:'100%'}}>Log Out</button>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/inventory/' className='text-white text-decoration-none'>Inventory</a></h5>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/delivery/' className='text-white text-decoration-none'>Delivery</a></h5>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/delivery/products' className='text-white text-decoration-none'>+ Add Delivery</a></h6>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/delivery/edit' className='text-white text-decoration-none'># Edit Delivery</a></h6>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/delivery/supermarket/new' className='text-white text-decoration-none'>+ Add Supermarket</a></h6>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/wishlist/' className='text-white text-decoration-none'>Wishlist</a></h5>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='top-bar-row row justify-content-center'>
                            <h2>Delivery</h2>
                        </div>
                        <div className='form-container'>
                            <div className='form-bowl'>
                                <div className='row justify-content-center'>
                                    <h3>New Delivery Product</h3>
                                </div>
                                <br/>
                                <form method='POST' action='/delivery/product'>
                                    <div className='row justify-content-center'>
                                        <p>Supermarket: <select name='supermarket'>
                                                        <option></option>
                                                        {allSupermarketsList}
                                                     </select>
                                        </p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Delivery Date: <input type='text' name='delivery_date' placeholder='Enter YYYY-MM-DD'/></p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Product: <input type='text' name='product_name' placeholder='Enter product name'/></p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Brand: <input type='text' name='brand' placeholder='Enter brand name'/></p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Image: <input type='text' name='img' placeholder='Enter image URL'/></p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Quantity: <input type='number' min='1' name='qty' placeholder='Enter quantity'/></p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Category: <select name='category'>
                                                        <option></option>
                                                        {allCategoriesList}
                                                     </select>
                                        </p>
                                    </div>
                                    <br/>
                                    <div className='row justify-content-center' style={{marginLeft:'5px'}}>
                                        <input type='submit' className='btn btn-primary' value='Submit'/>
                                    </div>
                                </form>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-4 bowl-base'></div>
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

module.exports = New_Delivery;