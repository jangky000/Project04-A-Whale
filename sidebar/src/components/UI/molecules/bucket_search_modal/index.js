import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import SearchResultItem from '../search_result_item';
import Span from '../../atoms/span';
import { useStyles, guide, presetItem, presetItemDetail, ButtonWrapper } from './style';
import { getPresets } from '../../../../lib/api';
import { loadPresetAction } from '../../../../modules/createbucket';

const BucketSearchModal = ({ modalClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [presets, setPresets] = useState([]);
  const [boldWord, setBoldWord] = useState('');
  const [selected, setSelected] = useState({});
  let timer = null;

  const onChangeHandler = async (e) => {
    const keyword = e.target.value;
    setLoading(true);
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      const response = await getPresets(keyword);
      const { data } = response.data;
      setPresets(data.splice(0, 4));
      setBoldWord(e.target.value);
      setLoading(false);
    }, 1000);
  };

  const loadButtonHandler = () => {
    dispatch(
      loadPresetAction({
        bucketTitle: selected.title,
        bucketDescription: selected.description,
        bucketDetails: selected.details.map((detail) => {
          return { title: detail.title, status: detail.status, dueDate: detail.dueDate };
        }),
      })
    );
    modalClose();
  };

  const preData = [
    {
      title: 'Loading',
    },
  ];

  const data = loading ? preData : presets;

  return (
    <div className={classes.ModalWrapper}>
      <Autocomplete
        options={data}
        filterOptions={(options) => options}
        getOptionLabel={(option) => option.title}
        getOptionDisabled={() => loading}
        style={{ width: '400px' }}
        renderOption={(option) => {
          if (loading) return <Span content="loading" />;
          return <SearchResultItem bucket={option} boldWord={boldWord} selectFunc={setSelected} />;
        }}
        renderInput={(params) => (
          <TextField {...params} label="목표 검색" variant="outlined" onChange={onChangeHandler} />
        )}
      />
      <Card className={classes.result}>
        {Object.keys(selected).length === 0 ? (
          <Span style={guide} content="검색어를 입력해주세요" />
        ) : (
          <>
            <Span style={presetItem} content={`목표 제목 : ${selected.title}`} />
            <Span style={presetItem} content={`목표 상세 : ${selected.description}`} />
            <Span style={presetItem} content="세부 목표 🔻" />
            {selected.details.map((detail) => {
              return <Span style={presetItemDetail} content={detail.title} />;
            })}
          </>
        )}
      </Card>
      <ButtonWrapper>
        <Button className={classes.cancelButton} variant="contained" onClick={modalClose}>
          닫기
        </Button>
        <Button
          className={classes.loadButton}
          variant="contained"
          onClick={loadButtonHandler}
          disabled={Object.keys(selected).length === 0}
        >
          가져오기
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default BucketSearchModal;
