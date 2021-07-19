class SDEvents {
  constructor(key) {
    this.key = key
    this.eventsUrl = "https://192.168.10.103:3000/api/events"
    this.userUrl = "https://192.168.10.103:3000/api/user"
  }

  // generateId() {
  //   var current_date = (new Date()).getTime().valueOf().toString();
  //   var random = Math.random().toString().replace("0.","");
  //   return `${current_date}${random}`;
  // }

  // setCookie(name, days = 0) {
  //   var hasCookie = this.getCookie(name)
  //   if (hasCookie) {
  //     return
  //   }
  //   const x = `${name}=${this.generateId()}; path=/; max-age=${60 * 60 * 24 * days}; SameSite=None; Secure`
  //   console.log(x)
  //   document.cookie = x
  // }

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

  // setUserId() {
  //   this.setCookie('sduid', 365*2)
  // }

  // setSessionId() {
  //   this.setCookie('sdsid', 1)
  // }

  setClient() {
    // create email alias so you can track all uids on the same user
  }

  // setUser() {
  //   this.setUserId()
  //   this.setSessionId()
  // }
  init() {
    // this.setUser()

    window.addEventListener("load", this.trackEvent.bind(this))
    document.addEventListener("click", this.trackEvent.bind(this))
    // document.addEventListener("mouseover", this.trackEvent.bind(this))
    document.addEventListener("change", this.trackEvent.bind(this))
  }
}

const eventTracker = new SDEvents("dasdas")
eventTracker.init()
