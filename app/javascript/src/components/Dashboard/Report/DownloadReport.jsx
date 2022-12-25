import React, { useEffect, useState } from "react";

import FileSaver from "file-saver";
import { Button, Typography } from "neetoui";
import { Container } from "neetoui/layouts";
import { useMutation, useQuery } from "reactquery";

import articlesApi from "apis/articles";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { onError } from "common/error";
import ProgressBar from "components/Common/ProgressBar";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const consumer = createConsumer();

  const { mutate: generatePdf } = useMutation(articlesApi.generatePdf, {
    onError,
  });

  const { refetch: downloadPdf } = useQuery(["report"], articlesApi.download, {
    enabled: false,
    select: data => data.data,
    onError,
    onSuccess: data => {
      FileSaver.saveAs(data, "scribble_soorajbhskrn_report.pdf");
      setIsLoading(false);
    },
  });

  const handleDownloadReport = () => {
    setIsLoading(true);
    downloadPdf();
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
      setMessage("Report is ready to be downloaded");
    }
  }, [progress]);

  return (
    <Container>
      <div className="mx-auto mt-48 w-3/6 space-y-6 rounded-md border-2 p-4 text-center">
        <Typography component="h1" style="h1">
          {message}
        </Typography>
        <ProgressBar progress={progress} />
        <Button
          disabled={isLoading}
          label="Download Report"
          loading={isLoading}
          onClick={handleDownloadReport}
        />
      </div>
    </Container>
  );
};

export default DownloadReport;
