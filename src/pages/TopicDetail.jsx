import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// ADICIONE ESTA LINHA:
import '../assets/css/gitcourse.css';