Module.register("mmm-cpasbien",{
    defaults: {
        fontSize: 9,
        dimmed: true,
        loadingText: 'Loading...',
        top: 10

    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.torrents = [];
        this.sendSocketNotification('GET_IP', {});
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        var header = document.createElement("header"); //support for config.changeColor
        header.innerHTML =  "Top " + this.config.top + " torrents"
        wrapper.appendChild(header);

	    //console.log("LENGTH" + this.torrents.length);
        if (!this.torrents || this.torrents.length === 0) {
            var text = document.createElement("div");
            text.innerHTML = this.translate("LOADING...");
            text.classList.add("dimmed", "light");
            wrapper.appendChild(text);
        } else if(null != this.torrents) {
            var table = document.createElement("table");
            table.classList.add("small","table");
            var max = this.torrents.length < 10 ? this.torrents.length : 10;
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
            name.innerHTML = 
            data[p].replace("DVDRIP","")
                   .replace("2016", "")
                   .replace("FRENCH", "")
                   .replace("720p","")
		   .replace("DVDSCR","");
            row.appendChild(name);
        }
        return row;
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "IP"){
            this.torrents = payload;
            this.updateDom();
        }
    }
});
