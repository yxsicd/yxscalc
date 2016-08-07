interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    hour:number;
    minute:number;
    constructor(h: number, m: number) { this.hour=h;this.minute=m}
}


export {ClockInterface}
export {Clock}