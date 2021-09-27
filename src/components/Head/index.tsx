import { Helmet } from 'react-helmet-async';

type HeadProps = {
  Title?: string
}

export function Head({Title = ''}: HeadProps){

  return (
    <Helmet>
      <title>Letmeask{Title && ` - ${Title}`}</title>
    </Helmet>
  );
}