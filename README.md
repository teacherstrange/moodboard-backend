# MOODBOARD BACKEND

## Dependencies

 * VirtualBox  (https://www.virtualbox.org/wiki/Downloads)
 * Vagrant (https://www.vagrantup.com/downloads.html

 ## Installation

    $ git clone https://github.com/z1digitalstudio/moodboard-backend.git
    $ cd moodboard-backend
    $ vagrant up --provision
    
 ## Development
    configure .env
    $ npx nestjs-admin createAdminUser
    $ yarn start:dev
    
 ## Migrations Scripts
 
    $ yarn migration:generate
    $ yarn migration:create
    $ yarn migration:run
    $ yarn migration:revert
