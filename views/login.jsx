const React = require("react");

class Login extends React.Component {
  render() {

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <br/>
                <h3 className='text-center'>Login</h3>
                <br/>
                <div className='row justify-content-center'>
                    <form method='POST' action='/inventory'>
                        <div className='row justify-content-center'>
                            <p>Username: <input type='text' name='user_name'/></p>
                        </div>
                        <div className='row justify-content-center'>
                            <p>Password:  <input type='password' name='password'/></p>
                        </div>
                        <br/>
                        <div className='row justify-content-center'>
                            <input type='submit' value='Submit' className='btn btn-primary'/>
                        </div>
                    </form>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;