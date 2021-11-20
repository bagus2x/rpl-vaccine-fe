import moment from "moment"

const humanDate = (epoch: number) => {
  return moment(epoch).format('DD MMM YYYY HH:mm')
}

export default humanDate
