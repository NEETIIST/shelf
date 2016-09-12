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
sudo apt-get install git
```
* Install NodeJS
```
wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -
sudo apt-get install nodejs
```
* Install MongoDB
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
service mongod status
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
