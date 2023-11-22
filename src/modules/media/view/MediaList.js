import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { mediaService } from '../mediaService';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'primereact/image';
import { endpoints } from '../../../constants/endpoints';
import { Button } from 'primereact/button';

const MediaList = () => {

  const [loading, setLoading] = useState(false);
  const [mediaList, setMedisList] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const media = useRef([]);

  const loadingData = useCallback(async () => {
    setLoading(true);
    const result = await mediaService.index(dispatch, page);

    if (result.status === 200) {
      media.current = result.data.data;
    }
    setLoading(false);
  }, [page]);

  const handleSeeMorePage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    if(page >= 1){
      setPage(page -1);
    }
  }

  useEffect(() => {
    loadingData();
  }, [loadingData, page])

  console.log(media);

  return (
    <div className=' grid'>

      <div className=' col-12'>
        <BreadCrumb />
      </div>

      <div className=' p-5 flex flex-wrap align-items-center justify-content-start gap-3'>
        {
          media.current?.length > 0 && media.current?.map((img, i) => {
            return (
              <div
                key={img?.id}
              >
                <div className=' block md:flex align-items-end jusfity-content-start gap-3'>
                  <Image
                    src={`${endpoints.image}/${img?.id}`}
                    className=' border-round-md slidedown'
                    alt="GSC Export"
                    width='300'
                    preview
                  />
                  {
                    i === media?.current?.length - 1 && (
                      <div className=' flex align-items-center gap-3 my-3 md:my-0'>
                        {
                          page > 1 && (
                            <Button
                              outlined
                              className=' text-black'
                              onClick={handlePrevPage}
                            >
                              Previous
                            </Button>
                          )
                        }
                        <Button
                          outlined
                          className=' text-black'
                          onClick={handleSeeMorePage}
                        >
                          See More...
                        </Button>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default MediaList