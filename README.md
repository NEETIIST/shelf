# Shelf
Documents repository from IST

### Install dependencies
* Update
```
sudo apt-get update
```
 * if update error
```
sudo vim /etc/resolvconf/resolv.conf.d/base
> nameserver 8.8.8.8
> nameserver 8.8.4.4
sudo resolvconf -u    
```
* Install GIT
```
sudo apt install git
```
* Install NodeJS
```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
# Using MAC OS X
brew install node
```
* Install MongoDB
```
sudo apt install -y mongodb
```
* Install Forever
```
sudo npm install -g forever
```

### Setup npm package
```
cd shelf
npm install
```

### Setup project data
```
node server/config/init_data.js
node server/services/fenix/init_teachers.js
```

### Start forever server
```
sudo forever start server.js
```
