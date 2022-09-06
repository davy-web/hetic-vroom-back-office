export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if (error.response.status === 500) {
      redirect('/sorry') //to define
    }
    if (error.response.status === 400) {
      console.log("Erreur axios", error);
    }
  })
  // $axios.onResponseError(error => {
  //   if (error.response.status === 400) {
  //     console.log("Erreur axios", error);
  //   }
  // })
}