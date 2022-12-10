import api from "./api";

const servicesForStatistic = {
    getStatistic: (statistic,filterType,filterValue) => {
        const url = "/api/admin/statistic?statistic="+statistic+'&filterType='+filterType+'&filterValue='+filterValue;
        return api.get(url);
    },
}

export default servicesForStatistic;