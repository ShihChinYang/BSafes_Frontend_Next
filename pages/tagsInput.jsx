import { useState } from "react";
import TagsInput from 'react-tagsinput-special'


const Example = () => {
  const [tags, setTags] = useState([]);

  const handleChange = (tags) => {
    setTags(tags);
  }
  return (
    <div>
      Tags
      <TagsInput value={tags} onChange={handleChange} />
    </div>
  );
};

export default Example;