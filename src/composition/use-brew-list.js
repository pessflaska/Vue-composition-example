import {ref, toRefs, reactive} from '@vue/composition-api';
import useFetch from './use-fetch';
export default function() {
  let breweries = reactive({list: [], error: null, fetching: false});
  const val = ref('');
  // let errors = reactive({error: null});
  const submitted = async () => {
    // try {
    //   const response = await fetch(
    //     `https://api1.openbrewerydb.org/breweries/?by_name=${val.value}`
    //   );
    //   const json = await response.json();
    //   breweries.list = ref(json);
    //   console.log(breweries.list);
    // } catch (error) {
    //   console.log(error);
    //   errors.error = reactive({ error });
    // }
    const {response, error, fetchData, fetching} = useFetch(
      `https://api.openbrewerydb.org/breweries/?by_name=${val.value}`,
      {}
    );
    fetchData();
    breweries.list = response;
    breweries.error = error;
    breweries.fetching = fetching;
  };
  return {submitted, ...toRefs(breweries), val};
}
