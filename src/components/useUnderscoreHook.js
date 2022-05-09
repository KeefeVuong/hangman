import React, { useState } from "react";

const useUnderScores = () => {
    var [underScores, setUnderScores] = useState("");
    return { underScores, setUnderScores };
  }
  
  export default useUnderScores;