Module.register("mmm-cpasbien",{
    defaults: {
        fontSize: 9,
        dimmed: true,
        loadingText: 'Loading...',
        topMax: 10,
        replace: ["DVDRIP","2016","FRENCH","DVDSCR"]

    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.torrents = [];
        this.sendSocketNotification('GET_IP', {});
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        var header = document.createElement("header"); //support for config.changeColor
        header.innerHTML =  "Top " + this.config.topMax + " torrents"
        wrapper.appendChild(header);

        if (!this.torrents || this.torrents.length === 0) {
            var text = document.createElement("div");
            text.innerHTML = this.translate(this.config.loadingText);
            text.classList.add("dimmed", "light");
            wrapper.appendChild(text);
        } else if(null != this.torrents) {
            var table = document.createElement("table");
            table.classList.add("small","table");
            var max = this.torrents.length < this.config.topMax ? this.torrents.length : this.config.topMax;
            table.appendChild(this.createLabelRow());
            for(var i = 0; i < max; i++) {
               if(this.torrents[i] != "undefined") {
               	  table.appendChild(this.createDataRow(this.torrents[i]));
               }    
            }
            wrapper.appendChild(table);
        }
        return wrapper;
    },

    createLabelRow: function () {
        var labelRow = document.createElement("tr");

        var nameLabel = document.createElement("th");
        nameLabel.innerHTML = "name";
        labelRow.appendChild(nameLabel);

        var seedsLabel = document.createElement("th");
        seedsLabel.innerHTML = "seeds";
        labelRow.appendChild(seedsLabel);

        var downLabel = document.createElement("th");
        downLabel.innerHTML = "down";
        labelRow.appendChild(downLabel);

        return labelRow;
    },

    createDataRow: function (data) {
        var row = document.createElement("tr");

        for (var p in data) {
            var name = document.createElement("td");
            name.innerHTML = this.removeString(data[p]);
            row.appendChild(name);
        }
        return row;
    },

    removeString: function (data) {
        for (var i = 0; i < this.config.replace.length; i++) {
            var data = data.replace(this.config.replace[i],"");
        }
        return data;
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "IP"){
            this.torrents = payload;
            this.updateDom();
        }
    }
});
