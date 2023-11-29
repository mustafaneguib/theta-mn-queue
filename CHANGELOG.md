## [3.0.0](https://github.com/mustafaneguib/theta-mn-queue/commit/2f6da94523b3c0d2c0b4928df3ffd6adec5ec859 , https://github.com/mustafaneguib/theta-mn-queue/commit/3d575d3db85d88da007689749c0922c751bc3380)
# Major Code Breaking Changes
- The entire queue structure and API has been revamped, and as such the layer QueueProcessor has been removed as it was not needed and the Queue class will be directly used to create queues.
- Named queues have been implemented, and now multiple queues can be persisted in the database.
- The file based driver has been updated and the json file has been replaced with an append only text file that is more easier to use, manage and maintain.

## [2.1.0](https://github.com/mustafaneguib/theta-mn-queue/commit/16799f82a9b80bddc0c22a1fec0e067263677d7c)
# Worked on the following:
- Refactored the code to improve the public facing API
- Added additional sections to the README.md file.

## [2.0.0](https://github.com/mustafaneguib/theta-mn-queue/commit/add9ba45a480e367b659e99e4b9e9ac0b60b593a)
# Worked on the following:
- Fixed bug in the Utility.ts file where the dotenv config was not being called due to the environment variables were not being retrieved.
- Implemented Redis driver to help persist data to the Redis data storage.

## [1.1.0](https://github.com/mustafaneguib/theta-mn-queue/commit/f17d3166805aae121564e6e760ef0959c279620a)
# Worked on the following:
- A rudimentary implementation of a queue with the essential methods required for a queue to function.
- File based storage implemented
- Improved the project structure.

## [1.0.4](https://github.com/mustafaneguib/theta-mn-queue/commit/665e9efd39e42300ed1a5114e503e4f88d121260)
# Worked on the setting up:
- The initial code base for the library
- License file
- Other required files to run the library