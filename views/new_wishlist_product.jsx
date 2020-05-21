const React = require("react");

class New_Wishlist_Product extends React.Component {
  render() {

    let allCategoriesList = this.props.allCategories.map(category => {
        return (<option>{category.category_name}</option>);
    })

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel='stylesheet' href='/new_wishlist_product_styles.css'/>
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
                            {/*<button className='btn' style={{width:'100%'}}>Log Out</button>*/}
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/inventory/' className='text-white text-decoration-none'>Inventory</a></h5>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/delivery/' className='text-white text-decoration-none'>Delivery</a></h5>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/wishlist/' className='text-white text-decoration-none'>Wishlist</a></h5>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/wishlist/products/' className='text-white text-decoration-none'>+ Add Product</a></h6>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/wishlist/edit' className='text-white text-decoration-none'># Edit Wishlist</a></h6>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='top-bar-row row justify-content-center'>
                            <h2>Wishlist</h2>
                        </div>
                        <div className='form-container'>
                            <div className='form-bowl'>
                                <div className='row justify-content-center'>
                                    <h3>New Product to Wishlist</h3>
                                </div>
                                <br/>
                                <form method='POST' action='/wishlist/new'>
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

module.exports = New_Wishlist_Product;