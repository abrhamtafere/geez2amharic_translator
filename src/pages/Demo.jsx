import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incremented,
  decremented,
  startLoading,
  stopLoading,
} from "../redux/slice/counterSlice";

const Demo = ()=> {
  const { value: count, loading } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(stopLoading());
    }, 1000);
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-10 text-center">
      {loading && <p>Loading...</p>}
      <h1 className="text-2xl font-bold">Counter Example</h1>
      <div className="text-4xl my-4">{count}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => dispatch(incremented())}
      >
        Increment
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
        onClick={() => dispatch(decremented())}
      >
        Decrement
      </button>
    </div>
  );
}

export default Demo;
