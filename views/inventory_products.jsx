const React = require("react");

class Inventory_Products extends React.Component {
  render() {

    const allProductsList = this.props.allProducts.map(product => {
        return (<div className='product-row col-6'>
                    <div className='row justify-content-center'>
                        <div className='product-col col-4'>
                            <img src={product.img} alt={product.product_name}/>
                        </div>
                        <div className='product-col col-6 product-text'>
                            <div className='product-col-row row'>
                                <p>Product: <strong>{product.product_name}</strong></p>
                            </div>
                            <div className='product-col-row row'>
                                <p>Brand: {product.brand}</p>
                            </div>
                            <div className='product-col-row row'>
                                <p>Category: {product.category_name}</p>
                            </div>
                            <div className='product-col-row row'>
                                <p>Expiry Date: <input type='text' name={product.product_id} placeholder='YYYY-MM-DD' style={{width:'110px'}}/></p>
                            </div>
                        </div>
                        <div className='product-col col-2'>
                            <div className='qty-box'>
                                <div className='product-col-row row justify-content-center'>
                                    <p>Qty</p>
                                </div>
                                <div className='product-col-row row justify-content-center'>
                                    <h1><input type='number' min='1' name={product.product_id} className='input-qty text-center'/></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
    })

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="/inventory_products_styles.css"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='nav-bar col-2'>
                        <div className='nav-bar-row row justify-content-center'>
                            <a href='/inventory/'><img src='../logo-reverse.png' className='logo'/></a>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5>Welcome, {this.props.userName}!</h5>
                            {/*<button className='btn' style={{width:'100%'}}>Log Out</button>*/}
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/inventory/' className='text-white text-decoration-none'>Inventory</a></h5>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/inventory/products' className='text-white text-decoration-none'>+ Add Product</a></h6>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/inventory/edit' className='text-white text-decoration-none'># Edit Inventory</a></h6>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/delivery/' className='text-white text-decoration-none'>Delivery</a></h5>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/wishlist/' className='text-white text-decoration-none'>Wishlist</a></h5>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='top-bar-row row justify-content-center'>
                            <h2>Inventory</h2>
                        </div>
                        <form method='POST' action='/inventory/products'>
                            <div className='instructions row justify-content-center'>
                                <div className='col-5 left-instructions'>
                                    <div className='row justify-content-center'>
                                        <h4>Add from past products</h4>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <p>Enter product details below.</p>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <input type='submit' value='Add Past Product' className='btn btn-info'/>
                                    </div>
                                </div>
                                <div className='col-2' style={{marginLeft: "-10px", marginTop:'20px'}}>
                                </div>
                                <div className='col-5 right-instructions'>
                                    <div className='row justify-content-center' style={{paddingTop:"10px"}}>
                                        <h4>Add a new product</h4>
                                    </div>
                                    <br/>
                                    <div className='row justify-content-center'>
                                        <button className='btn btn-primary'><a href='/inventory/products/new/' className='text-white text-decoration-none'>Add New Product</a></button>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='row' style={{backgroundColor: 'white', height:'15px', width:'125px', marginRight:'155px'}}></div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='row' style={{backgroundColor: 'white', height:'15px', width:'125px', marginLeft:'156px'}}></div>
                                </div>
                            </div>
                            </div>
                            <div className='row justify-content-between'>
                                {allProductsList}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br/>
        </body>
      </html>
    );
  }
}

module.exports = Inventory_Products;