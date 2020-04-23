# Integration Testing with slonik, jest and postgres

A simple experiment to check how to run integration tests
using a real postgress, but quickly, and in parallel.

The fastest approach is to run every test in a single
 transaction, where all the queries/updates are running.
 Once specific test is done, transaction is rollbacked.
 
 To run the examples, launch
 `./db.sh` to start docker with postgres and `npm test` to launch the tests
 
  
