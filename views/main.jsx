const React = require("react");

class Main extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <br/>
                <h3 className='text-center'>HungryGoNowhere</h3>
                <br/>
                <h5 className='text-center'>Your Food Inventory Tracker</h5>
                <h6 className='text-center'>Never again wonder what happened those tomatoes.</h6>
                <br/>
                <p className='text-center'>#sgunited #stayhomesg #ccb</p>
                <br/>
                <div className='row justify-content-center'>
                    <button className='btn btn-primary'><a href='/login/' className='text-white text-decoration-none'>Login</a></button>
                </div>
                <br/>
                <div className='row justify-content-center'>
                    <p>New user? Register <a href='#'>here</a></p>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Main;