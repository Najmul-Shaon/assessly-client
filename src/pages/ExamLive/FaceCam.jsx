const FaceCam = () => {
  return (
    <div className="flex justify-end">
      <video
        id="face-cam-video"
        autoPlay
        muted
        className="w-40 h-32 border rounded shadow"
      ></video>
    </div>
  );
};

export default FaceCam;
