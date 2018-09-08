
export class DateUtils{


    // 格式话时间戳 yyyy-mm-dd
	public static formatDate(date) {
		let d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
		
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		
		return [year, month, day].join('-');
	}

    // 获取当前时间
    public static nowDate(){
        DateUtils.formatDate( new Date().getTime())
    }

}