import styled from "styled-components/macro";

export const Card = styled.div`
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;

  margin-top: 40px;
  margin: auto;
  align-self: center;

  span {
    font-weight: bold;
  }

  .btn {
    background: #5bc0de;
    color: #fff;
  }
`;

export const CardContent = styled.div`
  padding: 20px;
`;

export const Wrapper = styled.main`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;
