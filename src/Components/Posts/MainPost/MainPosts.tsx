
import style from "./style.module.css";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";

import { actGetAllPosts } from "@store/posts/postSlice";
import InfiniteScroll from "react-infinite-scroll-component";

import axios from "axios";
import { TPost } from "@types";
import PostContainer from "../PostContiner/PostContainer";
import LottieHandler from "@Components/feedback/LottieHandler/LottieHandler";

const { postsContainer } = style;
function MainPosts() {
  
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const { posts} = useAppSelector((state) => state.post);
  const [items, setItems] = useState<[] | TPost[]>(posts || []);
  const dispatch = useAppDispatch()

  useEffect(() => {

    const getData = async () => {
      try {
        const response = await dispatch(actGetAllPosts());
        setItems((response.payload!.data) as [])
    
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch]);
  // eslint-disable-next-line react-hooks/exhaustive-deps


  const fetchMoreData = async () => {
    try {
           
      const response = await axios.get(
        `https://tarmeezacademy.com/api/v1/posts?limit=5&page=${index}`
      );
    
      const data = await response.data.data;
        setItems((prevItems) => [...prevItems, ...data]);
      data.length > 0 ? setHasMore(true) : setHasMore(false);

      setIndex((prev) => prev + 1);
    } catch (error) {
      console.log(error);
  
    }
  };

  

 
  return (
    <section className={postsContainer}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div><LottieHandler type="loading" message="please wait..."/></div>}
        >
          <PostContainer items={items}  /> 
    </InfiniteScroll>
    </section>
    )
}

export default MainPosts
