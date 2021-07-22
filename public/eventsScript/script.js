class SDEvents {
  constructor(key) {
    this.key = key
    this.eventsUrl = "https://192.168.10.103:3000/api/events"
  }

  getCookie(name) {
    var value = `; ${document.cookie}`;
    var parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  stringToJson(strObj) {
    if (!strObj) return false
    return strObj.replace(/(\w+:)|(\w+ :)/g, function(s) {
      return '"' + s.substring(0, s.length-1) + '":';
    })
  }

  trackEvent(e) {
    var data = e.type !== 'load' ? e.target.dataset['event'] : e.target.body.dataset['event']
    if(data || e.type === 'load') {
      this.sendEvent({
        url: window.location.href,
        type: e.type,
        pos: {
          x: e.pageX,
          y: e.pageY,
        },
        time: {
          timestamp: Date.now(),
          sinceLoaded: e.timeStamp,
        },
        data: {
          ...JSON.parse(this.stringToJson(data))
        }
      })
    }
  }

  sendEvent(event) {
    fetch(`${this.eventsUrl}/${this.key}`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        event
      }),
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': this.key,
      }
    })
  }

  init() {
    window.addEventListener("load", this.trackEvent.bind(this))
    document.addEventListener("click", this.trackEvent.bind(this))
    // document.addEventListener("mouseover", this.trackEvent.bind(this))
    document.addEventListener("change", this.trackEvent.bind(this))
  }
}

const eventTracker = new SDEvents("dasdas")
eventTracker.init()
