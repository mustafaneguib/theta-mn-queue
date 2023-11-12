
# Theta MN Queue

Theta Queue is an easy to use queue system with support for multiple data sources.


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Authors

- [@mustafaneguib](https://www.github.com/mustafaneguib)


## Implemented Features
At the moment a rudimentary queue has been implemented with all of the essential methods for a functioning queue. In addition, in order to implement persistant queues for now a JSON file is being used to save the state of the queue. 

## Planned Features
At the moment the current database that has been implemented is a json file that is written to when the commit method is called.
Support for the following databases/datastores is planned:

#### Redis
#### MySQL
#### MongoDB
#### PostgreSQL 
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATA_DRIVER`
The possible options for this variable are
file, mongodb, redis

## License

[MIT](https://choosealicense.com/licenses/mit/)

