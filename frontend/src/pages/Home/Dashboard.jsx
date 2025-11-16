import React, { useState, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import toast from 'react-hot-toast';

import Dashboardlayout from '../../Components/layout/Dashboardlayout';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../Components/layout/loader/DeleteAlertContent';
import SummaryCard from '../../Components/Cards/SummaryCard';
import { Modal } from '../../Components/Modal';
import { CARD_BG } from '../../utils/data';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  // Fetch all sessions
  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to fetch sessions.');
    }
  };

  // Delete selected session
  const deleteSession = async () => {
    const sessionToDelete = openDeleteAlert.data;
    if (!sessionToDelete?._id) {
      toast.error('No session selected for deletion.');
      setOpenDeleteAlert({ open: false, data: null });
      return;
    }

    setIsDeleting(true);

    try {
      const response = await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionToDelete._id));

      if (response.status === 200 || response.status === 204) {
        toast.success('Session deleted successfully!');
        await fetchAllSessions();
        setOpenDeleteAlert({ open: false, data: null });
      } else {
        toast.error('Failed to delete session. Unexpected server response.');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error(error.response?.data?.message || 'An unexpected error occurred while deleting the session.');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <Dashboardlayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions.map((data, index) => (
            <SummaryCard
              key={data?._id}
              color={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ''}
              topicsToFocus={data?.topicsToFocus || ''}
              experience={data?.experience || '-'}
              questions={data?.questions?.length || 0}
              description={data?.description || ''}
              lastUpdated={data?.updatedAt ? moment(data.updatedAt).format('DD MMM YYYY') : ''}
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        <button
          className="
            fixed bottom-10 md:bottom-20 right-10 md:right-20
            flex items-center justify-center gap-3
            h-12 px-7 py-2
            bg-gradient-to-r bg-[#E67E1F]
            text-white text-sm font-semibold
            rounded-full
            cursor-pointer
            transition-colors duration-300 ease-in-out
            hover:bg-black hover:text-white
            hover:shadow-2xl hover:shadow-orange-300
          "
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus />
          Add New
        </button>
      </div>

      {/* Create Session Modal */}
      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
        <CreateSessionForm />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
      >
        <DeleteAlertContent
          content="Are you sure you want to delete this session details?"
          onDelete={deleteSession}
        />
      </Modal>
    </Dashboardlayout>
  );
};

export default Dashboard;
