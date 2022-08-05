import yaml
from util.timit_dataset import load_dataset,create_dataloader
from util.functions import log_parser,batch_iterator, collapse_phn
from model.las_model import Listener,Speller
import numpy as np
from torch.autograd import Variable
import torch
import time
import matplotlib.pyplot as plt
#%matplotlib inline

# Load example config file for experiment
config_path = 'config/las_example_config.yaml'
conf = yaml.full_load(open(config_path,'r'))

# Parameters loading
#num_epochs = conf['training_parameter']['num_epochs']
training_msg = 'epoch_{:2d}_step_{:3d}_TrLoss_{:.4f}_TrWER_{:.2f}'
epoch_end_msg = 'epoch_{:2d}_TrLoss_{:.4f}_TrWER_{:.2f}_ValLoss_{:.4f}_ValWER_{:.2f}_time_{:.2f}'
listener_model_path = conf['meta_variable']['checkpoint_dir']+conf['meta_variable']['experiment_name']+'.listener'
speller_model_path = conf['meta_variable']['checkpoint_dir']+conf['meta_variable']['experiment_name']+'.speller'
verbose_step = conf['training_parameter']['verbose_step']
tf_rate_upperbound = conf['training_parameter']['tf_rate_upperbound']
tf_rate_lowerbound = conf['training_parameter']['tf_rate_lowerbound']
# Load preprocessed TIMIT Dataset
# X : Padding to shape [num of sample, max_timestep, feature_dim]
# Y : Squeeze repeated label and apply one-hot encoding (preserve 0 for <sos> and 1 for <eos>)
X_train, y_train, X_val, y_val, X_test, y_test = load_dataset(**conf['meta_variable'])
train_set = create_dataloader(X_train, y_train, **conf['model_parameter'], **conf['training_parameter'], shuffle=True)
valid_set = create_dataloader(X_val, y_val, **conf['model_parameter'], **conf['training_parameter'], shuffle=False)
test_set = create_dataloader(X_test, y_test, **conf['model_parameter'], **conf['training_parameter'], shuffle=False)



fig, axs = plt.subplots(1,2,figsize=(16,5))
tr_loss, tt_loss, tr_ler, tt_ler = log_parser('log/las_example.log')

axs[0].plot(tr_loss,label='Training');axs[0].plot(tt_loss,label='Validation');
axs[0].legend();axs[0].set_xlabel('training epochs');axs[0].set_ylabel('Loss');
axs[0].set_title('Learning Curve of LAS',size=15);axs[0].grid(True);
axs[1].plot(tr_ler,label='Training');axs[1].plot(tt_ler,label='Validation');axs[1].grid(True);
axs[1].legend();axs[1].set_xlabel('training epochs');axs[1].set_ylabel('Phoneme Error Rate');
axs[1].set_ylim(0,1)
axs[1].set_title('Performance of LAS',size=15)
plt.savefig('log/result.jpg')
