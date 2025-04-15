import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AllDataMovieOrTvDetails } from "../../interfacesApi/Details";
import { fetchingDataFromApi } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import "./searchResult.scss";

const SearchResult = () => {
  const [data, setData] = useState<AllDataMovieOrTvDetails | null | undefined>(
    null
  );
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { query } = useParams();

  const fetchInitialData = useCallback(() => {
    setLoading(true);
    fetchingDataFromApi<AllDataMovieOrTvDetails>(
      `/search/multi?query=${query}&page=${pageNum}`
    ).then((response) => {
      setData(response);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  }, [query, pageNum]);

  const fetchNextPageData = () => {
    fetchingDataFromApi<AllDataMovieOrTvDetails>(
      `/search/multi?query=${query}&page=${pageNum}`
    ).then((response) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...response.results],
        });
      } else {
        setData(response);
      }

      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {!!data && !!data.results && data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of - '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={!!data && !!data.results && data?.results?.length}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
